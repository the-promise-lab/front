// create-structure.js 예시
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const base = "src";

const structure = {
  components: ["ui", "layout"],
  pages: ["Home", "About", "Dashboard"],
  hooks: [],
  store: [],
  services: [],
  lib: [],
  types: [],
  assets: ["images", "icons"],
  styles: [],
};

Object.entries(structure).forEach(([folder, subfolders]) => {
  const folderPath = join(base, folder);
  mkdirSync(folderPath, { recursive: true });

  // 하위 폴더 생성
  subfolders.forEach((sub) => {
    mkdirSync(join(folderPath, sub), { recursive: true });
  });
  
  // 빈 .gitkeep 파일 넣기 (빈 폴더 git 관리 위해)
  writeFileSync(join(folderPath, ".gitkeep"), "");
});

console.log("src 구조 생성 완료!");
