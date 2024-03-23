// файл .d.ts где мы прямо указываем, что у нас будут файлы *.scss
declare module '*.scss' { 
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames;
	export = classNames;
}
