// src/custom.d.ts
declare module "*.jsx" {
    import type { FC } from "react";
    const component: FC<any>;
    export default component;
  }
  
  declare module "*.js" {
    import type { FC } from "react";
    const component: FC<any>;
    export default component;
  }
  