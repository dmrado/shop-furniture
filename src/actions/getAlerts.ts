'use server'
import { Alert } from '@/db/modeladmin/alert.model.ts'
import { InferAttributes, Op } from 'sequelize'

export const getAlerts = async (): Promise<Array<Alert>> => {
    const now = new Date()
    return await Alert.findAll({
        where: {
            startDate: {
                [Op.lt]: now
            },
            endDate: {
                [Op.gt]: now
            }
        },
        order: [['id', 'DESC']]
    }).then((alerts) => alerts.map((alert) => alert.toJSON()))
}

export const getAlert = async (
    id: number
): Promise<InferAttributes<Alert> | null> => {
    const alert = await Alert.findByPk(id)
    return alert ? alert.toJSON() : null // Если пост не найден, возвращаем null
}
