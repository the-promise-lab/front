/**
 * scenario-play feature slice
 *
 * 시나리오 진행(Day > Act > Event) 관련 UI와 상태 관리를 담당합니다.
 * - API: sessionsControllerExecuteNextAct (POST /api/sessions/active/next)
 * - 상태: useScenarioStore (현재 Act, Event 인덱스, 선택 상태)
 * - UI: 이벤트 타입별 화면 컴포넌트들
 */

// Model exports
export * from './model/types';
export * from './model/adapters';
export * from './model/useScenarioApi';
export * from './model/useScenarioStore';

// UI exports
export { ScenarioController } from './ui/ScenarioController';
export { default as SimpleEventScreen } from './ui/SimpleEventScreen';
export { default as StoryChoiceScreen } from './ui/StoryChoiceScreen';
export { default as ItemChoiceScreen } from './ui/ItemChoiceScreen';
export { default as StatusScreen } from './ui/StatusScreen';
export { default as SystemScreen } from './ui/SystemScreen';
export { default as SinglePortraitScreen } from './ui/SinglePortraitScreen';
export { default as SkipButton } from './ui/kit/SkipButton';
