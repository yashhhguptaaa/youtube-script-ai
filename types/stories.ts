export interface Page {
  txt: string;
  png: string;
}

export interface Script {
  script: string;
  pages: Page[];
}
