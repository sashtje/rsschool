export class Route {
  name: string;
  htmlName: string;
  defaultRoute: boolean;

  constructor(name: string, htmlName: string, defaultRoute: boolean) {
    this.name = name;
    this.htmlName = htmlName;
    this.defaultRoute = defaultRoute;
  }

  isActiveRoute(hashedPath: string): boolean {
    return hashedPath.replace('#', '') === this.name;
  }
}