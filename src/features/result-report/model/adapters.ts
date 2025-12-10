import type { SessionReportResponseDto } from '@api/models/SessionReportResponseDto';
import {
  ENDING_GRADE,
  POINT_TYPE,
  type EndingGrade,
  type PlayReportData,
  type PointType,
} from './types';

export function adaptPointType(type: string): PointType {
  const lowerCaseType = type.toLowerCase();
  if (Object.keys(POINT_TYPE).includes(lowerCaseType)) {
    return POINT_TYPE[lowerCaseType as PointType];
  }
  return POINT_TYPE.GOOD;
}

export function adaptEndingGrade(grade: string): EndingGrade {
  const lowerCaseGrade = grade.toLowerCase();
  if (Object.keys(ENDING_GRADE).includes(lowerCaseGrade)) {
    return ENDING_GRADE[lowerCaseGrade as EndingGrade];
  }
  return ENDING_GRADE.NORMAL;
}
export function adaptResultReport(
  data: SessionReportResponseDto
): PlayReportData {
  return {
    sessionMetadata: {
      id: data.data.session.id,
      userName: data.data.session.userName,
      characterGroupCode: data.data.session.characterGroupCode,
      characterGroupName: data.data.session.characterGroupName,
      status: data.data.session.status,
      endedAt: data.data.session.endedAt,
      createdAt: data.data.session.createdAt,
      totalPlayTimeSeconds: data.data.session.totalPlayTimeSeconds,
      lifePoint: data.data.session.lifePoint,
    },
    ending: {
      id: data.data.result.ending.endingId ?? 0,
      title: data.data.result.ending.title ?? 'Unknown Ending',
      grade: adaptEndingGrade(data.data.result.ending.grade ?? 'NORMAL'),
      image: data.data.result.ending.image,
    },
    points: data.data.result.points.map(point => ({
      type: adaptPointType(point.type),
      label: point.title,
      description: point.description,
    })),
    characters: data.data.result.characters.map(character => ({
      name: character.name,
      finalHealth: character.finalHp,
      finalMental: character.finalMental,
      maxHealth: character.maxHp ?? 100,
      maxMental: character.maxMental ?? 100,
      potential: 0, //FIXME: 서버 응답값에 프로퍼티 추가 후 수정
      characterCode: character.characterCode,
      survivalStatus: character.survivalStatus,
    })),
    survivalBag: {
      ownerNames: data.data.result.characters
        .map(character => character.name)
        .join(', '),
      bagName: data.data.result.survivalBag.bagName,
      usability: `${data.data.result.survivalBag.efficiency}%`,
      itemUsageRate: `${data.data.result.survivalBag.usageRate}%`,
      bagImage: `/bag_${data.data.result.survivalBag.bagName}.png`, // FIXME: 서버 응답값에 프로퍼티 추가 후 수정
      items:
        data.data.result.inventory?.map(item => ({
          id: item.itemId.toString(),
          name: item.itemName,
          image: '!!', // FIXME: 서버 응답값에 프로퍼티 추가 후 수정
          state: 'default',
        })) ?? [],
    },
    experiencePointsTotal: data.data.result.experiencePoints.total ?? 0,
  };
}
