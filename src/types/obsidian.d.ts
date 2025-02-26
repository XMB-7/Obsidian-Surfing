// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as obsidian from 'obsidian';
import { EditorPosition, MarkdownPreviewRenderer, Menu } from "obsidian";

declare module "obsidian" {
	export interface ItemView {
		headerEl: HTMLDivElement
	}

	interface App {
		plugins: {
			getPlugin(name: string): any;
		};
		commands: any;
		getTheme: () => string;
	}

	export interface WorkspaceLeaf {
		id: string

		history: {
			backHistory: Array<any>,
			forwardHistory: Array<any>
		},
		tabHeaderInnerIconEl: HTMLDivElement,
		tabHeaderInnerTitleEl: HTMLDivElement
		activeTime: number
		rebuildView: () => void;
		setDimension: (dimension: any) => void;
	}

	export interface WorkspaceItem {
		type: string;
	}

	interface VaultSettings {
		showViewHeader: boolean;
	}

	export interface Vault {
		config: Record<string, unknown>;

		getConfig<T extends keyof VaultSettings>(setting: T): VaultSettings[T];

		setConfig<T extends keyof VaultSettings>(setting: T, value: any): void;
	}

	class MarkdownPreviewRendererStatic extends MarkdownPreviewRenderer {
		static registerDomEvents(el: HTMLElement, handlerInstance: unknown, cb: (el: HTMLElement) => unknown): void;
	}

	export interface View {
		contentEl: HTMLElement,
		editMode: any,
		sourceMode: any
	}

	export interface Editor {
		getClickableTokenAt: (editorPos: EditorPosition) => tokenType
	}

	export interface MenuItem {
		setSubmenu: () => Menu;
	}

	export interface MarkdownView {
		triggerClickableToken: (token: tokenType, t: boolean | string) => void;
	}

	export interface MarkdownSourceView {
		triggerClickableToken: (token: tokenType, t: boolean | string) => void;
	}

	export interface MarkdownRenderer {
		constructor: (t: any, e: any, c: any) => any;
	}
}

export interface ISuggestOwner<T> {
	renderSuggestion(value: T, el: HTMLElement, index?: number): void;
}


interface tokenType {
	end: {
		line: number,
		ch: number
	}
	start: {
		line: number,
		ch: number
	}
	text: string;
	type: string;
}
