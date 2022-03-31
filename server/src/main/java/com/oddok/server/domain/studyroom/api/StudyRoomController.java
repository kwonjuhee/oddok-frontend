package com.oddok.server.domain.studyroom.api;

import com.oddok.server.domain.studyroom.api.request.CheckPasswordRequest;
import com.oddok.server.domain.studyroom.api.request.CreateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.request.UpdateStudyRoomRequest;
import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.GetStudyRoomResponse;
import com.oddok.server.domain.studyroom.api.response.TokenResponse;
import com.oddok.server.domain.studyroom.api.response.UpdateStudyRoomResponse;
import com.oddok.server.domain.studyroom.application.SessionService;
import com.oddok.server.domain.studyroom.application.StudyRoomHashtagService;
import com.oddok.server.domain.studyroom.application.StudyRoomService;
import com.oddok.server.domain.studyroom.dto.CheckPasswordDto;
import com.oddok.server.domain.studyroom.dto.IdClassForParticipantDto;
import com.oddok.server.domain.studyroom.dto.StudyRoomDto;
import com.oddok.server.domain.studyroom.mapper.CreateStudyRoomRequestMapper;
import com.oddok.server.domain.studyroom.mapper.GetStudyRoomResponseMapper;
import com.oddok.server.domain.studyroom.mapper.UpdateStudyRoomRequestMapper;
import com.oddok.server.domain.studyroom.mapper.UpdateStudyRoomResponseMapper;
import com.oddok.server.domain.user.application.UserService;
import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/study-room")
public class StudyRoomController {

    private final SessionService sessionService;
    private final StudyRoomService studyRoomService;
    private final StudyRoomHashtagService studyRoomHashtagService;
    private final UserService userService;

    public StudyRoomController(SessionService sessionService, StudyRoomService studyRoomService, StudyRoomHashtagService studyRoomHashtagService, UserService userService) {
        this.sessionService = sessionService;
        this.studyRoomService = studyRoomService;
        this.studyRoomHashtagService = studyRoomHashtagService;
        this.userService = userService;
    }

    /**
     * [GET] /study-room/user-create : 회원 생성 이후 삭제할 API
     */
    @GetMapping(value = "/user-create")
    public String createBasic() {
        return userService.createUser().toString();
    }

    /**
     * [POST] /study-room : 방생성 API (session)
     *
     * @return CreateStudyRoomResponse: 생성된 방 정보
     */
    @PostMapping
    public ResponseEntity<CreateStudyRoomResponse> create(@RequestHeader String userId, @RequestBody @Valid CreateStudyRoomRequest createStudyRoomRequest) throws OpenViduJavaClientException, OpenViduHttpException {
        // 1. OpenVidu 에 새로운 세션을 생성
        String sessionId = sessionService.createSession();

        CreateStudyRoomRequestMapper requestMapper = Mappers.getMapper(CreateStudyRoomRequestMapper.class);
        StudyRoomDto requestDto = requestMapper.toDto(createStudyRoomRequest);
        requestDto.setUserId(Long.parseLong(userId));
        requestDto.setSessionId(sessionId);

        // 2. StudyRoom 생성
        Long studyRoomId = studyRoomService.createStudyRoom(requestDto);

        // 3. hashtag 저장
        List<String> hashtags = createStudyRoomRequest.getHashtags();
        studyRoomHashtagService.createStudyRoom(studyRoomId, hashtags);

        CreateStudyRoomResponse createStudyRoomResponse = CreateStudyRoomResponse.builder().id(studyRoomId).build();
        return ResponseEntity.ok(createStudyRoomResponse);
    }

    /**
     * [PUT] /study-room : 방 정보 수정 API
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<UpdateStudyRoomResponse> update(@PathVariable Long id, @RequestHeader String userId, @RequestBody @Valid UpdateStudyRoomRequest updateStudyRoomRequest) {

        UpdateStudyRoomRequestMapper requestMapper = Mappers.getMapper(UpdateStudyRoomRequestMapper.class);
        StudyRoomDto requestDto = requestMapper.toDto(updateStudyRoomRequest);
        requestDto.setUserId(Long.parseLong(userId));

        StudyRoomDto studyRoomDto = studyRoomService.updateStudyRoom(id, requestDto);

        UpdateStudyRoomResponseMapper responseMapper = Mappers.getMapper(UpdateStudyRoomResponseMapper.class);
        UpdateStudyRoomResponse updateStudyRoomResponse = responseMapper.toResponse(studyRoomDto);

        return ResponseEntity.ok(updateStudyRoomResponse);
    }

    /**
     * [Get] /study-room/join/:id : 방참여 API, 토큰 반환
     *
     * @param id Long
     * @return token
     */
    @GetMapping(value = "/join/{id}")
    public ResponseEntity<TokenResponse> join(@PathVariable Long id, @RequestHeader String userId) {
        System.out.println("💘 " + userId + "님이 {" + id + "}방에 입장하셨습니다.");
        // 1. StudyRoom id 로 세션 id 가져오기
        StudyRoomDto studyRoomDto = studyRoomService.loadStudyRoom(id);

        // 2. OpenVidu Connection 생성 및 토큰 가져오기
        String token = sessionService.getToken(studyRoomDto.getSessionId());
        TokenResponse tokenResponse = TokenResponse.builder().token(token).build();

        // 3. Participant 정보 저장
        IdClassForParticipantDto requestDto = IdClassForParticipantDto.builder()
                .studyRoomId(id)
                .userId(userId)
                .build();
        studyRoomService.createParticipant(requestDto);

        return ResponseEntity.ok(tokenResponse);
    }

    /**
     * [GET] /study-room/:id : 방 상세 조회 API
     * @param id
     * @return GetStudyRoomResponse : 방 정보
     */
    @GetMapping(value = "/{id}")
    public ResponseEntity<GetStudyRoomResponse> get(@PathVariable Long id) {
        StudyRoomDto studyRoomDto = studyRoomService.loadStudyRoom(id);

        List<String> studyRoomHashtags = studyRoomHashtagService.loadStudyRoomHashtag(studyRoomDto.getId());

        GetStudyRoomResponseMapper responseMapper = Mappers.getMapper(GetStudyRoomResponseMapper.class);
        GetStudyRoomResponse getStudyRoomResponse = responseMapper.toResponse(studyRoomDto);
        getStudyRoomResponse.setHashtags(studyRoomHashtags);

        return ResponseEntity.ok(getStudyRoomResponse);
    }

     /**
     * [POST] /check/{study-room-id} : 스터디방 입장 비밀번호 확인
     * @param id
     * @param checkPasswordRequest : 비밀번
     */
    @PostMapping("/check/{id}")
    public void checkPassword(@PathVariable Long id, @RequestBody @Valid CheckPasswordRequest checkPasswordRequest) {
        CheckPasswordDto requestDto = CheckPasswordDto.builder()
                .studyRoomId(id)
                .password(checkPasswordRequest.getPassword())
                .build();

        studyRoomService.checkPassword(requestDto);
    }
}