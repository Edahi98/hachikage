import { BrowserWindow, Menu } from 'electron';
import { MainWindowOptionsBuilder } from './MainWindowOptionsBuilder';

export class MainWindowManager {
  private window: BrowserWindow | null = null;

  constructor(
    private readonly webpackEntry: string,
    private readonly preloadEntry: string,
  ) {}

  createWindow(): BrowserWindow {
    Menu.setApplicationMenu(null);

    const options = new MainWindowOptionsBuilder()
      .withTitle('Hachikage')
      .withSize(1280, 800)
      .withMinSize(960, 600)
      .withPreload(this.preloadEntry)
      .withDarkTitleBar()
      .build();

    this.window = new BrowserWindow(options);
    this.window.loadURL(this.webpackEntry);
    this.window.webContents.openDevTools();

    return this.window;
  }

  hasOpenWindow(): boolean {
    return BrowserWindow.getAllWindows().length > 0;
  }
}
