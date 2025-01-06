import { AddressModel } from '@/db/models/address.model'

export async function seedAddresses() {
  try {
    const addresses = [
      {
        userId: 1,
        phone: '+7 (999) 123-45-67',
        city: 'Москва',
        street: 'Лермонтова',
        home: '10',
        corps: '1',
        appart: '55',
        isMain: true
      },
      {
        userId: 1,
        phone: '+7 (999) 765-43-21',
        city: 'Москва',
        street: 'Пушкина',
        home: '15',
        corps: '',
        appart: '101',
        isMain: false
      },
      {
        userId: 1,
        phone: '+7 (999) 111-22-33',
        city: 'Санкт-Петербург',
        street: 'Невский проспект',
        home: '20',
        corps: 'А',
        appart: '75',
        isMain: false
      },
    //   {
    //     userId: 3,
    //     phone: '+7 (999) 123-45-67',
    //     city: 'Москва',
    //     street: 'Иванова',
    //     home: '10',
    //     corps: '1',
    //     appart: '55',
    //     isMain: true
    //   },
    //   {
    //     userId: 4,
    //     phone: '+7 (999) 123-45-67',
    //     city: 'Москва',
    //     street: 'Крупской',
    //     home: '10',
    //     corps: '1',
    //     appart: '55',
    //     isMain: true
    //   },
    //   {
    //     userId: 4,
    //     phone: '+7 (999) 765-43-21',
    //     city: 'Москва',
    //     street: 'Пушкина',
    //     home: '125',
    //     corps: '',
    //     appart: '101',
    //     isMain: false
    //   },
      {
        userId: 5,
        phone: '+7 (999) 111-22-33',
        city: 'Санкт-Петербург',
        street: 'Невский проспект',
        home: '10',
        corps: 'B',
        appart: '15',
        isMain: true
      },
      {
        userId: 6,
        phone: '+7 (999) 765-43-21',
        city: 'Москва',
        street: 'Пушкина',
        home: '115',
        corps: '',
        appart: '111',
        isMain: false
      },
      {
        userId: 6,
        phone: '+7 (999) 111-22-33',
        city: 'Санкт-Петербург',
        street: '3-я Строителей',
        home: '25',
        corps: '',
        appart: '12',
        isMain: true
      }
    ];

    await AddressModel.bulkCreate(addresses);
    console.log('Адреса успешно добавлены');
  } catch (error) {
    console.error('Ошибка при добавлении адресов:', error);
  }
}
