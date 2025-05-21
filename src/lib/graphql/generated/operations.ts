export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Activity = {
  cost: Scalars['Float']['output'];
  description: Maybe<Scalars['String']['output']>;
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  locations: Array<Location>;
  title: Scalars['String']['output'];
};

export type AddActivityToUserTripInput = {
  activityId: Scalars['ID']['input'];
  startTime: Scalars['DateTime']['input'];
  userTripId: Scalars['ID']['input'];
};

export type CatalogTrip = {
  continent: Scalars['String']['output'];
  country: Scalars['String']['output'];
  description: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  expenses: Array<CatalogTripExpense>;
  id: Scalars['ID']['output'];
  locations: Array<Location>;
  startDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  totalCost: Scalars['Float']['output'];
};

export type CatalogTripExpense = {
  amount: Scalars['Float']['output'];
  catalogTrip: CatalogTrip;
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type CreateUserTripInput = {
  catalogTripId: Scalars['ID']['input'];
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type Location = {
  activities: Array<Activity>;
  arrivalDate: Scalars['DateTime']['output'];
  catalogTrip: CatalogTrip;
  departureDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  addActivityToUserTrip: UserTripActivity;
  createUser: User;
  createUserTrip: UserTrip;
  deleteUserTrip: Scalars['Boolean']['output'];
  removeActivityFromUserTrip: Scalars['Boolean']['output'];
};


export type MutationAddActivityToUserTripArgs = {
  input: AddActivityToUserTripInput;
};


export type MutationCreateUserTripArgs = {
  input: CreateUserTripInput;
};


export type MutationDeleteUserTripArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveActivityFromUserTripArgs = {
  activityId: Scalars['ID']['input'];
  userTripId: Scalars['ID']['input'];
};

export type Query = {
  activitiesByLocation: Array<Activity>;
  activity: Maybe<Activity>;
  catalogTrip: Maybe<CatalogTrip>;
  catalogTripExpenses: Array<CatalogTripExpense>;
  catalogTrips: Array<CatalogTrip>;
  catalogTripsByContinent: Array<CatalogTrip>;
  catalogTripsByCountry: Array<CatalogTrip>;
  expensesByCategory: Array<CatalogTripExpense>;
  location: Maybe<Location>;
  locationsByCatalogTrip: Array<Location>;
  user: Maybe<User>;
  userTrip: Maybe<UserTrip>;
  userTripsByUser: Array<UserTrip>;
  users: Array<User>;
};


export type QueryActivitiesByLocationArgs = {
  locationId: Scalars['ID']['input'];
};


export type QueryActivityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCatalogTripArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCatalogTripExpensesArgs = {
  catalogTripId: Scalars['ID']['input'];
};


export type QueryCatalogTripsByContinentArgs = {
  continent: Scalars['String']['input'];
};


export type QueryCatalogTripsByCountryArgs = {
  country: Scalars['String']['input'];
};


export type QueryExpensesByCategoryArgs = {
  catalogTripId: Scalars['ID']['input'];
  category: Scalars['String']['input'];
};


export type QueryLocationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationsByCatalogTripArgs = {
  catalogTripId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserTripArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserTripsByUserArgs = {
  userId: Scalars['ID']['input'];
};

export type User = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  userTrips: Array<UserTrip>;
};

export type UserTrip = {
  activities: Array<UserTripActivity>;
  catalogTrip: CatalogTrip;
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  startDate: Scalars['DateTime']['output'];
  totalCost: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type UserTripActivity = {
  activity: Activity;
  startTime: Scalars['DateTime']['output'];
  userTrip: UserTrip;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { users: Array<{ id: string, createdAt: any }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { user: { id: string, createdAt: any, userTrips: Array<{ id: string, startDate: any, endDate: any }> } | null };

export type CreateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserMutation = { createUser: { id: string, createdAt: any } };
