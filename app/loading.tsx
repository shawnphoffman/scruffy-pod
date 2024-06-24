// import { faFalcon, faScruffyDice } from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { faScruffyDice } from '@awesome.me/kit-d7ccc5bb1a/icons/kit/custom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Loading() {
	return (
		<div className="text-4xl text-brand-yellow">
			<FontAwesomeIcon icon={faScruffyDice} beatFade size="2x" />
			{/* <FontAwesomeIcon icon={faFalcon} beatFade /> */}
		</div>
	)
}
