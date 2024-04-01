interface Baker {
  baker_id: string;
  name: string;
  img: string;
  address: string;
  suburb: string;
  postcode: string;
  contact: string;
  speciality: string;
}

interface Review {
  review_id: string;
  baker_id: string;
  rating: string;
  review: string;
  user_id: string;
  created_at: string;
  baker_name: string;
  user_name: string;
}

interface User {
  user_id: string;
  user_name: string;
  user_type: string;
}
export { Baker, Review, User };
