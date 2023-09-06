export interface IDoctor {
  _id: number,
  __v: number,
  SSN: number,
  firstName: string,
  lastName: string,
  age: number,
  email: string,
  address: {
    city: string,
    street: string,
    building: number,
    [key: string]: any;
  },
  specialty: {
    specialty: string
  },
  image: string,
  phone: string,
  clinic: [
    {
      location: {
        city: string,
        street: string,
        building: number,
    },
    _id: number
  }
  ],
  availability: boolean
}
