import handlebars from "handlebars";
import fs from "fs";

interface IVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: IVariables;
}

export class MailTemplateProvider {
  async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const fileContent = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(fileContent);

    return parseTemplate(variables);
  }
}
