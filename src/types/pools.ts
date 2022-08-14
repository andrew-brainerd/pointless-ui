export interface AcceptWagerRequest {
  poolId: string,
  wagerId: string,
  userEmail: string
}

export interface CompleteWagerRequest extends AcceptWagerRequest {
  winnerEmail: string
}

export interface CreatePoolRequest {
  name: string,
  createdBy: string
}

export interface CreateWagerRequest {
  poolId: string,
  wager: Wager
}

export interface DeleteWagerRequest {
  poolId: string,
  wagerId: string
}

export interface Points {
  [userId: string]: number
}

export interface Pool {
  _id: string,
  name: string,
  users: Array<string>
  wagers: Array<Wager>,
  activeWagers?: Array<Wager>,
  inactiveWagers?: Array<Wager>,
  completedWagers?: Array<Wager>,
  pointTotals: Points,
  startingPoints: Points,
  pendingPoints: Points
}

export interface PoolRequest {
  poolId: string
}

export interface PoolUserRequest {
  poolId: string,
  userEmail: string
}

export interface UserPoolsRequest {
  userEmail: string
}

export interface Wager {
  _id: string,
  amount: number,
  description: string,
  users: Array<string>,
  createdBy: string,
  isActive: boolean,
  isComplete: boolean,
  winners: Array<string>
}
