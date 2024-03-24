export function json() {
	return src(path.src.json)
		.pipe(plimber())
		.pipe(dest(path.build.json))
}