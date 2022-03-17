package com.oddok.server.domain.studyroom.api.request;

import lombok.Getter;

@Getter
public class UpdateStudyRoomRequest {
    private String name;
    private String user; // token 만들면 삭제할 예정
    /*
    private String image;

    private Boolean isPublic;

    private String password;

    private Integer targetTime;

    private String rule;

    private Integer limitUsers;

    private LocalDateTime startAt;

    private LocalDateTime endAt;
     */
}
