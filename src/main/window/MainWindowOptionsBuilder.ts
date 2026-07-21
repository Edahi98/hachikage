import { BrowserWindowConstructorOptions } from 'electron';

const TITLE_BAR_BACKGROUND = '#2e1065';
const TITLE_BAR_SYMBOL_COLOR = '#ede9fe';
const TITLE_BAR_HEIGHT = 64;

export class MainWindowOptionsBuilder {
  private options: BrowserWindowConstructorOptions = {};

  withTitle(title: string): this {
    this.options.title = title;
    return this;
  }

  withSize(width: number, height: number): this {
    this.options.width = width;
    this.options.height = height;
    return this;
  }

  withMinSize(minWidth: number, minHeight: number): this {
    this.options.minWidth = minWidth;
    this.options.minHeight = minHeight;
    return this;
  }

  withPreload(preloadPath: string): this {
    this.options.webPreferences = {
      ...this.options.webPreferences,
      preload: preloadPath,
    };
    return this;
  }

  withDarkTitleBar(): this {
    this.options.backgroundColor = TITLE_BAR_BACKGROUND;
    this.options.titleBarStyle = 'hidden';
    this.options.titleBarOverlay = {
      color: TITLE_BAR_BACKGROUND,
      symbolColor: TITLE_BAR_SYMBOL_COLOR,
      height: TITLE_BAR_HEIGHT,
    };
    return this;
  }

  build(): BrowserWindowConstructorOptions {
    return this.options;
  }
}
