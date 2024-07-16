import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  SysRoleAddReqDto,
  SysRoleDeleteReqDto,
  SysRoleListItemRespDto,
  SysRoleUpdateReqDto,
} from './role.dto';
import { SystemRoleService } from './role.service';
import { wrapResponse } from '/@/common/utils/swagger';
import { ApiSecurityAuth } from '/@/decorators/swagger.decorator';

@ApiTags('System role - 系统角色')
@ApiSecurityAuth()
@Controller('role')
export class SystemRoleController {
  constructor(private roleService: SystemRoleService) {}

  @Get('list')
  @ApiOkResponse({
    type: wrapResponse({
      type: SysRoleListItemRespDto,
      struct: 'list',
    }),
  })
  async list() {
    return this.roleService.getRoleByList();
  }

  @Post('delete')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async delete(@Body() body: SysRoleDeleteReqDto) {
    await this.roleService.deleteRole(body.id);
  }

  @Post('add')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async add(@Body() body: SysRoleAddReqDto) {
    await this.roleService.addRole(body);
  }

  @Post('update')
  @ApiOkResponse({
    type: wrapResponse(),
  })
  async update(@Body() body: SysRoleUpdateReqDto) {
    await this.roleService.updateRole(body);
  }
}
