'use server'
import {AddressModel} from "@/db/models"
import {revalidatePath} from "next/cache";


// Определение типа AddressRow
interface AddressRow {
    id: number;
    userId: string;
    phone: string;
    city: string;
    street: string;
    home: string;
    corps: string;
    appart: string;
    isMain: boolean;
}

/**
 * Преобразует экземпляр модели AddressModel в объект AddressRow
 * @param address Экземпляр модели AddressModel
 * @returns Объект AddressRow с необходимыми полями
 */
const mapAddressRow = (address: AddressModel): AddressRow => {
    if (!address) {
        throw new Error(`Address with id ${address.id} does not exist`);
    }

    return {
        id: address.id,
        userId: address.userId,
        phone: address.phone,
        city: address.city,
        street: address.street,
        home: address.home,
        corps: address.corps,
        appart: address.appart,
        isMain: address.isMain
    };
};


export const getAddressById = async (id: number) => {
    const address = await AddressModel.findByPk(id)
    console.log('>>>>>>>>>>>>>>>>> >>>>>>>>>>>>>>>>>> address getAddressById', address)

    if (!address) {
        return null
    }
    return mapAddressRow(address)
}

export const deleteAddressRowAction = async (id: number) => {
    await AddressModel.destroy({
        where: {id}
    })
}
