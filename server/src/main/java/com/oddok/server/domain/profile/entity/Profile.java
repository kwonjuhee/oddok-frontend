package com.oddok.server.domain.profile.entity;

import com.oddok.server.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "user_profile")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    @Column(length = 255)
    private String goal;

    @Column(name = "target_time")
    private LocalDate targetTime;

    @Column(name = "d_day")
    private LocalDate dDay;

    @Builder
    public Profile(User user, String goal, LocalDate targetTime, LocalDate dDay) {
        this.user = user;
        this.goal = goal;
        this.targetTime = targetTime;
        this.dDay = dDay;
    }
}
