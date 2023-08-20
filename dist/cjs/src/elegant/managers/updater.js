"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorette_1 = require("colorette");
/**
 * Class for checking and notifying updates.
 * @private
 * @constructor
 */
class UpdateChecker {
    constructor() {
        this.notified = false;
    }
    /**
     * Fetches the latest module version from npm registry.
     * @private
     * @returns {Promise<string|null>} Latest version or null if error.
     */
    async fetchLatestModuleVersion() {
        try {
            const response = await fetch('https://registry.npmjs.org/@elegantdb/events');
            const module = await response.json();
            return module['dist-tags'].latest;
        }
        catch (error) {
            console.error('Error fetching latest version:', error);
            return null;
        }
    }
    /**
     * Gets the current version from package.json.
     * @private
     * @returns {Promise<string|null>} Current version or null if error.
     */
    async getCurrentVersion() {
        try {
            return UpdateChecker.version;
        }
        catch (error) {
            console.error('Error reading package.json:', error);
            return null;
        }
    }
    /**
     * Checks for updates and displays notifications if available.
     * @returns {Promise<boolean|null>} true if updates found, null if notified already.
     */
    async checkUpdates() {
        if (this.notified)
            return null;
        const [latest, current] = await Promise.all([
            this.fetchLatestModuleVersion(),
            this.getCurrentVersion()
        ]);
        if (!latest || !current) {
            console.error('Failed to retrieve version information.');
            return null;
        }
        if (current === latest)
            return true;
        const latestParts = latest.split('.');
        const currentParts = current.split('.');
        const latestMajor = latestParts[0];
        const latestPatch = latestParts[2];
        const latestBuild = latestParts[3];
        const currentMajor = currentParts[0];
        const currentPatch = currentParts[2];
        const currentBuild = currentParts[3];
        let type = "";
        let color;
        if (currentMajor !== latestMajor) {
            type = 'Major';
            //  color = red
        }
        else if (currentPatch !== latestPatch) {
            type = 'Patch';
            //  color = yellow
        }
        else if (latestBuild && currentBuild !== latestBuild) {
            type = 'Build';
            //  color = green
            this.notified = true;
        }
        const message = `New ${(0, colorette_1.yellow)(type)} version available: ${(0, colorette_1.red)(current)} > ${(0, colorette_1.red)(latest)}`;
        console.info((message));
        return true;
    }
}
/**
* Database version.
* @readonly
* @static
*/
UpdateChecker.type = "UPDATECHECKER";
UpdateChecker.version = "1.0.0";
exports.default = UpdateChecker;
