import { Response } from 'express'

import authenticate, { IncomingAuthenticateRequest } from '@sb/controllers/users/authenticate'
import getUser from '@sb/controllers/users/utils/get-user'
import encrypt from '@sb/encryption/encrypt'
import { StatusCodes } from '@sb/types/status-codes'


jest.mock('@sb/controllers/users/utils/get-user')
jest.mock('@sb/encryption/encrypt')
const mockEncrypt = encrypt as jest.Mock


describe('authenticate', () => {
  it('should return a 200 if the user is found', async () => {
    const mockGetUser = getUser as jest.Mock
    mockGetUser.mockResolvedValue({ id: '123' })
    mockEncrypt.mockReturnValue('encrypted-token')

    const request = { get: jest.fn().mockReturnValue('Bearer token') } as unknown as IncomingAuthenticateRequest
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
    await authenticate(request, response)
    expect(response.status).toHaveBeenCalledWith(StatusCodes.OK)
    expect(response.json).toHaveBeenCalledWith({ id: '123', key: 'encrypted-token' })
  })
})