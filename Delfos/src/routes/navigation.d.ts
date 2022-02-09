//declarar globalmente que a lista de parametros 
// vai usar a tipagem declarada

import { AppRoutesParamList } from "./app.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutesParamList {}
  }
}