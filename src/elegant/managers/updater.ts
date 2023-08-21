import { bgMagenta, whiteBright, bold, red, green, yellow } from 'colorette';

/**
 * Class for checking and notifying updates.
 * @private
 * @constructor
 */
class UpdateChecker {
  private notified: boolean;
 /**
 * Database version.
 * @readonly
 * @static
 */
static type: string = "UPDATECHECKER";
static version: string = "1.0.0";
  constructor() {
    this.notified = false;
  }

  /**
   * Fetches the latest module version from npm registry.
   * @private
   * @returns {Promise<string|null>} Latest version or null if error.
   */
  private async fetchLatestModuleVersion(): Promise<string | null> {
    try {
      const response = await fetch('https://registry.npmjs.org/elegantdb');
      const module = await response.json();
      return module['dist-tags'].latest;
    } catch (error) {
      console.error('Error fetching latest version:', error);
      return null;
    }
  }

  /**
   * Gets the current version from package.json.
   * @private
   * @returns {Promise<string|null>} Current version or null if error.
   */
  private async getCurrentVersion(): Promise<string | null> {
    try {
      return UpdateChecker.version;
    } catch (error) {
      console.error('Error reading package.json:', error);
      return null;
    }
  }

  /**
   * Checks for updates and displays notifications if available.
   * @returns {Promise<boolean|null>} true if updates found, null if notified already.
   */
  public async checkUpdates(): Promise<boolean | null> {
    if (this.notified) return null;

    const [latest, current] = await Promise.all([
      this.fetchLatestModuleVersion(),
      this.getCurrentVersion()
    ]);

    if (!latest || !current) {
      console.error('Failed to retrieve version information.');
      return null;
    }

    if (current === latest) return true;

    const latestParts = latest.split('.');
    const currentParts = current.split('.');

    const latestMajor = latestParts[0];
    const latestPatch = latestParts[2];
    const latestBuild = latestParts[3];

    const currentMajor = currentParts[0];
    const currentPatch = currentParts[2];
    const currentBuild = currentParts[3];

    let type: string = "";
    let color: (text: string) => string;

    if (currentMajor !== latestMajor) {
      type = 'Major';
    //  color = red
    } else if (currentPatch !== latestPatch) {
      type = 'Patch';
    //  color = yellow
    } else if (latestBuild && currentBuild !== latestBuild) {
      type = 'Build';
    //  color = green
      this.notified = true;
    }

    const message = `${bgMagenta("[ELEGANTDB]")} New ${yellow(type)} version available: ${red(current)} > ${red(latest)}`;

    console.info((message));
    return true;
  }
}
export default UpdateChecker;