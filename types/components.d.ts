import { VersaPage } from "./VersaPage";
import { VersaForm } from "./VersaForm";
 
declare module "vue" {
  export interface GlobalComponents {
    VersaPage: VersaPage;
    VersaForm: VersaForm
  }
}
export {};
