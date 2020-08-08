export interface OrderModel{
    id: number,
    bannerId : string,
    orderedDate: string,
    pickUpDate: string,
    deliveredDate?:string,
    orderstatus: string,
    details: OrderDetailModel[]
}

export interface OrderDetailModel
{
    itemId: number,
    quantity: number
}

export interface ItemModel{
    id: number,
    itemname: string,
    quantity: number
}
