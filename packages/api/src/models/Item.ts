/* eslint-disable @typescript-eslint/camelcase */
import Money, { transformMoneyResponse, transformMoneyRequest } from './Money'
import { ErrorResponse, isErrorResponse, transformErrorResponse } from './Error'
import { Nullable } from './helpers'
import Pagination from './Pagination'

enum VisState {
	active,
	deleted,
}

export default interface Item {
	id: string
	accountingSystemId: string
	updated: Date
	name: string
	description?: Nullable<string>
	qty: number
	sku?: Nullable<string>
	inventory?: Nullable<number>
	unitCost: Money
	tax1: string
	tax2: string
	visState: VisState
}

function transformItemData({
	id,
	accounting_systemid: accountingSystemId,
	updated,
	name,
	description,
	qty,
	sku,
	inventory,
	unit_cost: unitCost,
	tax1,
	tax2,
	vis_state: visState,
}: any): Item {
	return {
		id: id.toString(),
		accountingSystemId,
		updated: new Date(updated),
		name,
		description,
		qty: Number(qty),
		sku,
		inventory: !inventory ? null : Number(inventory),
		unitCost: transformMoneyResponse(unitCost),
		tax1: tax1.toString(),
		tax2: tax2.toString(),
		visState,
	}
}

export function transformItemResponse(data: string): Item | ErrorResponse {
	const response = JSON.parse(data)

	if (isErrorResponse(response)) {
		return transformErrorResponse(response)
	}
	const {
		response: {
			result: { item },
		},
	} = response

	return transformItemData(item)
}

export function transformItemListResponse(
	data: string
): { items: Item[]; pages: Pagination } | ErrorResponse {
	const response = JSON.parse(data)

	if (isErrorResponse(response)) {
		return transformErrorResponse(response)
	}

	const {
		response: {
			result: { items, per_page, total, page, pages },
		},
	} = response

	return {
		items: items.map((item: any) => transformItemData(item)),
		pages: {
			size: per_page,
			total,
			page,
			pages,
		},
	}
}

export function transformItemRequest({
	name,
	description,
	qty,
	sku,
	inventory,
	unitCost,
	tax1,
	tax2,
	visState,
}: Item): string {
	const result = JSON.stringify({
		item: {
			name,
			description,
			qty,
			sku,
			inventory,
			unit_cost: unitCost && transformMoneyRequest(unitCost),
			tax1,
			tax2,
			vis_state: visState,
		},
	})
	return result
}
