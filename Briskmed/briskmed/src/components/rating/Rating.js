import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
const Rate = () => {
	const [rate, setRate] = useState(0);
	return (
		<Container >
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label>
						<Radio
							type="radio"
							value={givenRating}
							onClick={() => {
								setRate(givenRating);
							}}
						/>
						<Rating className="h-8 flex w-12" >
							<FaStar className="h-8 flex w-12 -mt-56"
								color={
									givenRating < rate || givenRating === rate
										? "fcff50"
										: "rgb(192,192,192)"
								}
							/>
						</Rating>
					</label>
				);
			})}
		</Container>
	);
};

export default Rate;