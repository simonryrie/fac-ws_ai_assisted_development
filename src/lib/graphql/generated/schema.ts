import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User as UserModel, CatalogTrip as CatalogTripModel, UserTrip as UserTripModel, Location as LocationModel, Activity as ActivityModel, CatalogTripExpense as CatalogTripExpenseModel } from '@prisma/client';
import { GraphQLContext } from '../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  __typename?: 'Activity';
  cost: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
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
  __typename?: 'CatalogTrip';
  continent: Scalars['String']['output'];
  country: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  expenses: Array<CatalogTripExpense>;
  id: Scalars['ID']['output'];
  locations: Array<Location>;
  startDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  totalCost: Scalars['Float']['output'];
};

export type CatalogTripExpense = {
  __typename?: 'CatalogTripExpense';
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
  __typename?: 'Location';
  activities: Array<Activity>;
  arrivalDate: Scalars['DateTime']['output'];
  catalogTrip: CatalogTrip;
  departureDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
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
  __typename?: 'Query';
  activitiesByLocation: Array<Activity>;
  activity?: Maybe<Activity>;
  catalogTrip?: Maybe<CatalogTrip>;
  catalogTripExpenses: Array<CatalogTripExpense>;
  catalogTrips: Array<CatalogTrip>;
  catalogTripsByContinent: Array<CatalogTrip>;
  catalogTripsByCountry: Array<CatalogTrip>;
  expensesByCategory: Array<CatalogTripExpense>;
  location?: Maybe<Location>;
  locationsByCatalogTrip: Array<Location>;
  user?: Maybe<User>;
  userTrip?: Maybe<UserTrip>;
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
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  userTrips: Array<UserTrip>;
};

export type UserTrip = {
  __typename?: 'UserTrip';
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
  __typename?: 'UserTripActivity';
  activity: Activity;
  startTime: Scalars['DateTime']['output'];
  userTrip: UserTrip;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Activity: ResolverTypeWrapper<ActivityModel>;
  AddActivityToUserTripInput: AddActivityToUserTripInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CatalogTrip: ResolverTypeWrapper<CatalogTripModel>;
  CatalogTripExpense: ResolverTypeWrapper<CatalogTripExpenseModel>;
  CreateUserTripInput: CreateUserTripInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<LocationModel>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<UserModel>;
  UserTrip: ResolverTypeWrapper<UserTripModel>;
  UserTripActivity: ResolverTypeWrapper<Omit<UserTripActivity, 'activity' | 'userTrip'> & { activity: ResolversTypes['Activity'], userTrip: ResolversTypes['UserTrip'] }>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Activity: ActivityModel;
  AddActivityToUserTripInput: AddActivityToUserTripInput;
  Boolean: Scalars['Boolean']['output'];
  CatalogTrip: CatalogTripModel;
  CatalogTripExpense: CatalogTripExpenseModel;
  CreateUserTripInput: CreateUserTripInput;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Location: LocationModel;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: UserModel;
  UserTrip: UserTripModel;
  UserTripActivity: Omit<UserTripActivity, 'activity' | 'userTrip'> & { activity: ResolversParentTypes['Activity'], userTrip: ResolversParentTypes['UserTrip'] };
}>;

export type ActivityResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = ResolversObject<{
  cost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locations?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CatalogTripResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CatalogTrip'] = ResolversParentTypes['CatalogTrip']> = ResolversObject<{
  continent?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expenses?: Resolver<Array<ResolversTypes['CatalogTripExpense']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  locations?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CatalogTripExpenseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CatalogTripExpense'] = ResolversParentTypes['CatalogTripExpense']> = ResolversObject<{
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  catalogTrip?: Resolver<ResolversTypes['CatalogTrip'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type LocationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  activities?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType>;
  arrivalDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  catalogTrip?: Resolver<ResolversTypes['CatalogTrip'], ParentType, ContextType>;
  departureDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addActivityToUserTrip?: Resolver<ResolversTypes['UserTripActivity'], ParentType, ContextType, RequireFields<MutationAddActivityToUserTripArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createUserTrip?: Resolver<ResolversTypes['UserTrip'], ParentType, ContextType, RequireFields<MutationCreateUserTripArgs, 'input'>>;
  deleteUserTrip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteUserTripArgs, 'id'>>;
  removeActivityFromUserTrip?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveActivityFromUserTripArgs, 'activityId' | 'userTripId'>>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  activitiesByLocation?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType, RequireFields<QueryActivitiesByLocationArgs, 'locationId'>>;
  activity?: Resolver<Maybe<ResolversTypes['Activity']>, ParentType, ContextType, RequireFields<QueryActivityArgs, 'id'>>;
  catalogTrip?: Resolver<Maybe<ResolversTypes['CatalogTrip']>, ParentType, ContextType, RequireFields<QueryCatalogTripArgs, 'id'>>;
  catalogTripExpenses?: Resolver<Array<ResolversTypes['CatalogTripExpense']>, ParentType, ContextType, RequireFields<QueryCatalogTripExpensesArgs, 'catalogTripId'>>;
  catalogTrips?: Resolver<Array<ResolversTypes['CatalogTrip']>, ParentType, ContextType>;
  catalogTripsByContinent?: Resolver<Array<ResolversTypes['CatalogTrip']>, ParentType, ContextType, RequireFields<QueryCatalogTripsByContinentArgs, 'continent'>>;
  catalogTripsByCountry?: Resolver<Array<ResolversTypes['CatalogTrip']>, ParentType, ContextType, RequireFields<QueryCatalogTripsByCountryArgs, 'country'>>;
  expensesByCategory?: Resolver<Array<ResolversTypes['CatalogTripExpense']>, ParentType, ContextType, RequireFields<QueryExpensesByCategoryArgs, 'catalogTripId' | 'category'>>;
  location?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<QueryLocationArgs, 'id'>>;
  locationsByCatalogTrip?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<QueryLocationsByCatalogTripArgs, 'catalogTripId'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userTrip?: Resolver<Maybe<ResolversTypes['UserTrip']>, ParentType, ContextType, RequireFields<QueryUserTripArgs, 'id'>>;
  userTripsByUser?: Resolver<Array<ResolversTypes['UserTrip']>, ParentType, ContextType, RequireFields<QueryUserTripsByUserArgs, 'userId'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  userTrips?: Resolver<Array<ResolversTypes['UserTrip']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserTripResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserTrip'] = ResolversParentTypes['UserTrip']> = ResolversObject<{
  activities?: Resolver<Array<ResolversTypes['UserTripActivity']>, ParentType, ContextType>;
  catalogTrip?: Resolver<ResolversTypes['CatalogTrip'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  totalCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserTripActivityResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UserTripActivity'] = ResolversParentTypes['UserTripActivity']> = ResolversObject<{
  activity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userTrip?: Resolver<ResolversTypes['UserTrip'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  Activity?: ActivityResolvers<ContextType>;
  CatalogTrip?: CatalogTripResolvers<ContextType>;
  CatalogTripExpense?: CatalogTripExpenseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserTrip?: UserTripResolvers<ContextType>;
  UserTripActivity?: UserTripActivityResolvers<ContextType>;
}>;

