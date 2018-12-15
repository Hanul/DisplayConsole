/**
 * JavaScript 콘솔 화면을 웹 페이지 화면에 출력합니다.
 */
global.console = OBJECT({

	init : (inner, self) => {

		let logWrapper;
		let logCount = 0;

		let log = self.log = function() {
			
			let msg = '';

			EACH(arguments, (arg, i) => {

				let str = JSON.stringify(arg);

				if (typeof arg === 'string') {
					str = str.substring(1, str.length - 1);
				}

				msg += str;

				if (i < arguments.length - 1) {
					msg += ' ';
				}
			});

			if (logWrapper === undefined) {
				logWrapper = DIV({
					style : {
						position : 'fixed',
						left : 0,
						bottom : 0,
						backgroundColor : '#fff',
						width : '100%',
						zIndex : 999999,
						margin : 0
					}
				}).appendTo(BODY);
			}
			
			let p;
			logWrapper.append(p = P({
				style : {
					padding : 2,
					margin : 0,
					borderTop : '1px solid #F0F0F0',
					fontWeight : 'bold',
					color : '#666'
				},
				c : msg
			}));

			logCount += 1;
			logWrapper.show();

			DELAY(5, () => {
				p.remove();

				logCount -= 1;

				if (logCount === 0) {
					logWrapper.remove();
					logWrapper = undefined;
				}
			});
		};
	}
});