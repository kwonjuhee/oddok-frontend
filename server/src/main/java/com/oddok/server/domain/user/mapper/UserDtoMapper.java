package com.oddok.server.domain.user.mapper;

import com.oddok.server.domain.user.api.response.ChangeNicknameResponse;
import com.oddok.server.domain.user.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper
public interface UserDtoMapper {

    ChangeNicknameResponse toChangeNicknameResponse(UserDto dto);

}