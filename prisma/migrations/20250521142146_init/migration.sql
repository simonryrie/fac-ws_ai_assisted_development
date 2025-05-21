-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CatalogTrip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "country" TEXT NOT NULL,
    "continent" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserTrip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "catalogTripId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserTrip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserTrip_catalogTripId_fkey" FOREIGN KEY ("catalogTripId") REFERENCES "CatalogTrip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "catalogTripId" TEXT NOT NULL,
    "arrivalDate" DATETIME NOT NULL,
    "departureDate" DATETIME NOT NULL,
    CONSTRAINT "Location_catalogTripId_fkey" FOREIGN KEY ("catalogTripId") REFERENCES "CatalogTrip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "cost" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "ActivityLocation" (
    "activityId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    PRIMARY KEY ("activityId", "locationId"),
    CONSTRAINT "ActivityLocation_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActivityLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserTripActivity" (
    "userTripId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,

    PRIMARY KEY ("userTripId", "activityId"),
    CONSTRAINT "UserTripActivity_userTripId_fkey" FOREIGN KEY ("userTripId") REFERENCES "UserTrip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserTripActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CatalogTripExpense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "catalogTripId" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "CatalogTripExpense_catalogTripId_fkey" FOREIGN KEY ("catalogTripId") REFERENCES "CatalogTrip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
