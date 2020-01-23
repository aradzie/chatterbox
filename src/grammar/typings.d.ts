import { Grammar } from "../types";

declare module "*.json" {
  const value: Grammar;
  export default value;
}
