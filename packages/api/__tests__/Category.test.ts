import {
	transformCategoryJSON,
	transformCategoryResponse,
} from '../src/models/Category'

/* eslint-disable @typescript-eslint/camelcase */

describe('@freshbooks/api', () => {
	describe('Group', () => {
		test('Verify JSON -> model transform', () => {
			const json = `{
                
                "category": "Car & Truck Expenses",
                "categoryid": 3012654,
                "created_at": "2019-06-05 11:42:54",
                "id": 3012654,
                "is_cogs": false,
                "is_editable": false,
                "parentid": null,
                "updated_at": "2019-06-05 11:42:54",
                "vis_state": 0
            }
                `
			const model = transformCategoryJSON(json)
			const expected = {
				category: 'Car & Truck Expenses',
				categoryId: '3012654',
				createdAt: new Date('2019-06-05 11:42:54'),
				id: '3012654',
				isCogs: false,
				isEditable: false,
				parentId: null,
				updatedAt: new Date('2019-06-05 11:42:54'),
				visState: 0,
			}
			expect(model).toEqual(expected)
		})
		test('Verify Category response object -> model transform', () => {
			const categoryResponse = {
				category: 'Car & Truck Expenses',
				categoryid: 3012654,
				created_at: '2019-06-05 11:42:54',
				id: 3012654,
				is_cogs: false,
				is_editable: false,
				parentid: null,
				updated_at: '2019-06-05 11:42:54',
				vis_state: 0,
			}
			const model = transformCategoryResponse(categoryResponse)
			const expected = {
				category: 'Car & Truck Expenses',
				categoryId: '3012654',
				createdAt: new Date('2019-06-05 11:42:54'),
				id: '3012654',
				isCogs: false,
				isEditable: false,
				parentId: null,
				updatedAt: new Date('2019-06-05 11:42:54'),
				visState: 0,
			}
			expect(model).toEqual(expected)
		})
	})
})
