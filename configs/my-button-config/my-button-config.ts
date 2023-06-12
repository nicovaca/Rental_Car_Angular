export class MyButtonConfig {
  public customCssClass: string;
  public text: string;
  public icon: string;

  constructor(customCssClass: string, text: string, icon: string) {
    this.customCssClass = customCssClass;
    this.text = text;
    this.icon = icon;
  }
}
