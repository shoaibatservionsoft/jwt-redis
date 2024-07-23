Nexteat Database Structure

Users:
	_id, username, email, password, type, hourly_rate, currency, interests: [interestID_subinterestID],  conversations: [conversationID], credit_cards:[ccID], profile: {name, tagline, images: [imageID], phone, country, city, post_code, address1, address2}, likes: [userID], swipe_left: [userID], swipe_right: [userID], status: Active | Inactive,  rents: [rentID], timestamps

