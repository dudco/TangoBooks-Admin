import { useState } from "react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SubPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export default { utils: "utils" };

export const useFormFiled = <S>(initialState: S): [S, (event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void, (filed: S) => void] => {
  const [fileds, setFileds] = useState(initialState);

  return [
    fileds,
    function(event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
      let filed = fileds;
      let value = "value";
      if (event.currentTarget.type === "checkbox") {
        value = "checked";
      }
      if (event.currentTarget.name.split(".").length > 1) {
        const nested = event.currentTarget.name.split(".");
        filed = { ...fileds, [nested[0]]: { ...fileds[nested[0]], [nested[1]]: event.currentTarget[value] } };
      } else {
        filed = { ...fileds, [event.currentTarget.name]: event.currentTarget[value] };
      }
      setFileds(filed);
    },
    function(filed): void {
      setFileds(filed);
    }
  ];
};
