import SurfingPlugin from "../surfingIndex";
import { t } from "../translations/helper";

export class HeaderBar {
	plugin: SurfingPlugin;
	private searchBar: HTMLInputElement;
	private onSearchBarEnterListener = new Array<(url: string) => void>;
	removeChild = true;

	constructor(parent: Element, plugin: SurfingPlugin, removeChild?: boolean) {
		this.plugin = plugin;
		if (removeChild !== undefined) this.removeChild = removeChild;
		// CSS class removes the gradient at the right of the header bar.
		parent.addClass("wb-header-bar");
		// Remove default title from header bar.
		// Use Obsidian API to remove the title.
		if (this.removeChild) parent.empty();

		// Create search bar in header bar.
		// Use Obsidian CreateEL method.
		this.searchBar = parent.createEl("input", {
			type: "text",
			placeholder: t("Search with") + this.plugin.settings.defaultSearchEngine + t("or enter address"),
			cls: "wb-search-bar"
		});

		// TODO: Would this be ok to use Obsidian add domlistener instead?
		this.searchBar.addEventListener("keydown", (event: KeyboardEvent) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			if (!event) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const event = window.event as KeyboardEvent;
			}
			if (event.key === "Enter") {
				// When enter is pressed, search for the url.
				for (const listener of this.onSearchBarEnterListener) {
					listener(this.searchBar.value);
				}
			}
		}, false);

		// Use focusin to bubble up to the parent
		// Rather than just input element itself.
		this.searchBar.addEventListener("focusin", (event: FocusEvent) => {
			this.searchBar.select();
		})

		// When focusout, unselect the text to prevent it is still selected when focus back
		// It will trigger some unexpected behavior,like you will not select all text and the cursor will set to current position;
		// The expected behavior is that you will select all text when focus back;
		this.searchBar.addEventListener("focusout", (event: FocusEvent) => {
			window.getSelection()?.removeAllRanges();
			if (!this.removeChild) {
				this.searchBar.detach();
			}
		})
	}

	addOnSearchBarEnterListener(listener: (url: string) => void) {
		this.onSearchBarEnterListener.push(listener);
	}

	setSearchBarUrl(url: string) {
		this.searchBar.value = url;
	}

	focus() {
		this.searchBar.focus();
	}
}
