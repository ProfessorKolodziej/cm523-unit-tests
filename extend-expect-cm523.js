expect.extend({
	toHaveOneH1( received ) {
		const headingOneQuery = received.querySelectorAll( 'h1' );

		if ( null === headingOneQuery || 0 === headingOneQuery.length ) {
			return {
				message: () =>
					`This page does not have an <h1> element. Make sure you have an <h1> element on the page.`,
				pass: false,
			};
		} else if ( 1 === headingOneQuery.length ) {
			return {
				message: () =>
					`Excellent! There is one and only one <h1> element on the page.`,
				pass: true,
			};
		} else {
			return {
				message: () =>
					`This page has more than one <h1> element. This can be detrimental to screen readers and isn't common practice.`,
				pass: false,
			};
		}
	},
	allTextIsWrapped( received ) {
		const childNodes = received.childNodes;

		for ( var i = 0; i < childNodes.length; i++ ) {
			let node = childNodes[i];

			if ( node.nodeName === "#text" && node.nodeValue.trim() ) {
				return {
					message: () =>
						`All text on this page should be wrapped in heading or <p> tags.`,
					pass: false,
				};
			}
		}

		return {
			message: () =>
				`All text is wrapped.`,
			pass: true,
		};
	},
});
