package com.oddok.server.domain.studyroom.entity;

import com.oddok.server.domain.studyroom.api.response.CreateStudyRoomResponse;
import com.oddok.server.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class StudyRoom {
    @Id
    @GeneratedValue
    Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "session_id")
    private String sessionId;

    private String image;

    @Column(name = "is_publlic")
    private Boolean isPublic;

    @Column(length = 255)
    private String password;

    @Column(name = "target_time")
    private Integer targetTime;

    private String rule;

    @Column(name = "current_users")
    private Integer currentUsers;

    @Column(name = "limit_users")
    private Integer limitUsers;

    @Column(name = "start_at")
    private LocalDateTime startAt;

    @Column(name = "end_at")
    private LocalDateTime endAt;

    @CreatedDate
    @Column(name = "create_at")
    private LocalDateTime createAt;

    public StudyRoom(String name, User user, String sessionId) {
        this.name = name;
        this.user = user;
        this.sessionId = sessionId;
    }

    public CreateStudyRoomResponse toCreateStudyRoomResponse(){
        return CreateStudyRoomResponse.builder()
                .studyRoomId(id)
                .sessionId(sessionId)
                .build();
    }
}