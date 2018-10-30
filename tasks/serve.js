import gulp from 'gulp';
import browserSync from 'browser-sync';
import dotenv from 'dotenv';
import runBuild from './build';
import runSass, { SASS_SRC } from './sass';
import runScripts, { JS_SRC } from './scripts';
import runHtml, { HTML_SRC } from './html';
import runFonts, { FONT_SRC } from './fonts';
import runImages, { IMG_SRC } from './images';
import runVendors, { VENDOR_SRC } from './vendors';

const server = browserSync.create();

function reload(done) {
	server.reload();
	done();
}

function serve(done) {
	dotenv.config();

	let options = {
		server: {
			baseDir: process.env.DEST,
		},
	};

	if (process.env.URL) {
		options = {
			proxy: process.env.URL,
		};
	}

	server.init(options);
	done();
}

const watchHtml = () => gulp.watch(HTML_SRC, gulp.series(runHtml, reload));
const watchSass = () => gulp.watch(SASS_SRC, gulp.series(runSass, reload));
const watchScripts = () => gulp.watch(JS_SRC, gulp.series(runScripts, reload));
const watchImages = () => gulp.watch(IMG_SRC, gulp.series(runImages, reload));
const watchFont = () => gulp.watch(FONT_SRC, gulp.series(runFonts, reload));
const watchVendors = () => gulp.watch(VENDOR_SRC, gulp.series(runVendors, reload));

const runWatch = gulp.parallel(watchHtml, watchSass, watchScripts, watchImages, watchFont, watchVendors);
const runServe = gulp.series(runBuild, serve, runWatch);

gulp.task('serve', runServe);
