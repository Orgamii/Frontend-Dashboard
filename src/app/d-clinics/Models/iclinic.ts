export interface IClinic {
  _id: number,
  __v: number,
  location: {
    city: string,
    street: string,
    building: number,
    [key: string]: any;
  }
  mobilePhone: string,
  doctors: [
    {
      _id: number,
      firstName: string,
      lastName: string,
      specialty: {
        specialty: string
      }
    }
  ],
  manager: number,
  availability: boolean
}
