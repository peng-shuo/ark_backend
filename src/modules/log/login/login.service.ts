import { Injectable } from '@nestjs/common';
import { AbstractService } from '/@/common/abstract.service';
import { SysLogTypeEnum } from '/@/constants/type';
import { SysLogEntity } from '/@/entities/sys-log.entity';
import { SysUserEntity } from '/@/entities/sys-user.entity';
import { LogLoginRespItemDto } from './login.dto';

@Injectable()
export class LogLoginService extends AbstractService {
  async getLoginLogByPage(page: number, limit: number) {
    const query = this.entityManager
      .createQueryBuilder(SysLogEntity, 'log')
      .innerJoinAndSelect(SysUserEntity, 'user', 'user.id = log.userId')
      .where('log.type = :type', { type: SysLogTypeEnum.Login })
      .select([
        'user.account AS account',
        'log.id AS id',
        'log.ip AS ip',
        'log.uri AS uri',
        'log.status AS status',
        'log.createTime AS createTime',
      ])
      .skip((page - 1) * limit)
      .limit(limit);

    const rows = await query.getRawMany<LogLoginRespItemDto>();
    const total = await query.getCount();

    return rows.toPage({
      page,
      limit,
      total,
    });
  }
}
