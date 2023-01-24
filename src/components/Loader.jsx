import React from 'react';

export const Loader = () => {
	return (
		<div>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				style={{
					margin: 'auto',
					background: 'rgba(255, 255, 255, 0)',
					display: 'block',
					shapeRendering: 'auto',
				}}
				width='50px'
				height='50px'
				viewBox='0 0 100 100'
				preserveAspectRatio='xMidYMid'>
				<circle
					cx={50}
					cy={50}
					r={32}
					strokeWidth={8}
					stroke='#0d6efd'
					strokeDasharray='50.26548245743669 50.26548245743669'
					fill='none'
					strokeLinecap='round'>
					<animateTransform
						attributeName='transform'
						type='rotate'
						repeatCount='indefinite'
						dur='1s'
						keyTimes='0;1'
						values='0 50 50;360 50 50'
					/>
				</circle>
			</svg>
            <p className='mx-auto w-50 text-center' >There is no To-Do's yet ! Lets Create or check internet connection </p>
		</div>
	);
};
