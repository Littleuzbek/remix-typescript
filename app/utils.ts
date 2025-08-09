import {
  FieldValue,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase-admin/firestore";
import { auth, getAdminServices } from "./activation";
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { redirect } from "@remix-run/react";
import { v4 as uuid } from "uuid";

export interface Product {
  name?: string;
  title?: string;
  image: string | string[];
  discount?: number;
  price: number;
  rating?: number;
  feedback?: number;
  specs?: null | string;
  proType?: string;
  options?: {
    color: null | string[];
    size: null | string[];
  };
  id: string;

  // old keys that might exist
  oldPrice?: number;
  category?: string;
  images?: string | string[];
  // key "price" was used as discount previously
}

export interface manualTimestamp {
  seconds?: number;
  nanoseconds?: number;
  _seconds?: number;
  _nanoseconds?: number;
}

export interface UserData {
  name: string;
  birthDay: null | Timestamp | manualTimestamp;
  gender: null | string;
  isAdmin?: boolean;
  email: string;
  surname: null | string;
  number: null | string;
  createdAt: Timestamp | manualTimestamp;
  banned: boolean;
}

interface ReturnedMessage {
  success: boolean;
  error: string;
}

export interface changeData {
  birthDay?: string;
  userGender?: string;
  userName?: string;
  userSurname?: string;
  userNum?: string;
}

interface orderedProducts {
  color?: null | string[]
  size?: null | string[]
  id: string
  image: string[] | string
  name: string
  price: number
  quantity: number
  totalPrice: number
}

export interface nasiyaItems {
  payment1?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
  payment2?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
  payment3?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment4?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment5?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment6?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment7?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment8?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment9?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment10?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment11?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
   payment12?: {
    condition: boolean
    date: manualTimestamp
    sum: number
  }
}

export interface OrderProps {
  confirmed?: boolean | null
  nasiyaCondition?: boolean | null
  orderAdress: string
  orderCondition: boolean | null
  orderDate: manualTimestamp
  orderDeliveryDate: null
  orderId: string
  orderOwner: UserData
  orderTotalPrice: number
  orderItems: orderedProducts[]
  nasiya?: nasiyaItems | undefined | null
}

export const getProducts = async (): Promise<Product[] | null> => {
  const { adminDb } = await getAdminServices();

  const snapshot = await adminDb
    .collection("exko")
    .doc("data")
    .collection("items")
    .get();

  const products = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    ...doc.data(),
  }));

  return products.length > 0 ? products : null;
};

export const getUserData = async (
  userId: string
): Promise<undefined | UserData> => {
  const { adminDb } = await getAdminServices();

  const userData = await adminDb
    .collection("exko")
    .doc("users")
    .collection("users")
    .doc(userId)
    .get();

  return userData?.data() as UserData | undefined;
};

export const getUserOrders = async (userId: string): Promise<OrderProps[]> => {
  const { adminDb } = await getAdminServices();

  const ordersSnapshot = await adminDb
      .collection("exko")
      .doc("users")
      .collection("users")
      .doc(userId)
      .collection("orders")
      .get();
  
    const orders = ordersSnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
      ...doc.data(),
    }));

  return orders;
}

const ReturnMessage = (
  condition: boolean,
  message: string
): { success: boolean; error: string } => {
  return {
    success: condition,
    error: message,
  };
};

export const login = async (
  formData: FormData
): Promise<Response | ReturnedMessage> => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    if (
      email &&
      password &&
      typeof email === "string" &&
      typeof password === "string"
    ) {
      const user: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user?.user?.uid) {
        const userDoc = await getUserData(user.user.uid);
        if (userDoc) {
          return redirect(`/user/${user.user.uid}/orders`);
        } else {
          // if email id is not equal to token id then sign out user
          signOut(auth);
          return ReturnMessage(false, "email or password is wrong!");
        }
      } else {
        return ReturnMessage(false, "email or password is wrong!");
      }
    } else {
      return ReturnMessage(false, "Please provide email and password");
    }
  } catch (error: any) {
    if (error.code === "auth/invalid-credential") {
      return ReturnMessage(false, "email or password is wrong!");
    } else if (error.code === "auth/too-many-requests") {
      return ReturnMessage(false, "too many attempts");
    } else {
      return ReturnMessage(false, "Please try again later");
    }
  }
};

export const signUp = async (formData: FormData) => {
  const newUserId = formData.get("newUserData") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const { adminDb } = await getAdminServices();

  if (newUserId) {
    const userExists = await getUserData(newUserId);

    if (!userExists) {
      await adminDb
        .collection("exko")
        .doc("users")
        .collection("users")
        .doc(newUserId)
        .set({
          banned: false,
          birthDay: null,
          email: email,
          gender: null,
          isAdmin: false,
          name: name,
          number: null,
          surname: null,
          createdAt: FieldValue.serverTimestamp(),
        });

      return redirect(`/user/${newUserId}/orders`);
    } else {
      return ReturnMessage(false, "email is already in use!");
    }
  } else {
    return ReturnMessage(false, "Something went wrong please try again later.");
  }
};

export const tokenVerifier = async (
  idToken: string
): Promise<string | null> => {
  if (!idToken) {
    throw new Error("No token provided");
  }

  const { adminAuth } = await getAdminServices();
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  return decodedToken ? decodedToken?.uid : null;
};

//  This function converts date to timeStamp object
export const dateToTimestampObject = (
  dateString: string | undefined
): Timestamp | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  const createdTimestamp = Timestamp.fromDate(date);

  return createdTimestamp;
};

export const changeUserData = async (
  userId: string,
  userNewData: changeData,
  idToken: string
) => {
  try {
    const { adminDb } = await getAdminServices();

    const checkedToken = await tokenVerifier(idToken);

    if (checkedToken !== userId) {
      throw new Error("Unauthorized: Token doesn't match user");
    }

    const filteredData = Object.entries({
      birthDay:
        userNewData?.birthDay !== "Tug'ilgan sana"
          ? dateToTimestampObject(userNewData?.birthDay)
          : undefined,
      gender: ["male", "female"].includes(userNewData?.userGender || "no")
        ? userNewData?.userGender
        : undefined,
      name:
        userNewData?.userName?.trim().split(/\s+/)[0] === ""
          ? undefined
          : userNewData?.userName?.trim().split(/\s+/)[0],
      surname:
        userNewData?.userSurname?.trim().split(/\s+/)[0] === ""
          ? undefined
          : userNewData?.userSurname?.trim().split(/\s+/)[0],
      number:
        userNewData?.userNum?.length === 17 ? userNewData.userNum : undefined,
    }).reduce(
      (acc: Record<string, string | undefined | Timestamp>, [key, value]) => {
        if (value !== undefined) acc[key] = value;
        return acc;
      },
      {} as Record<string, string | undefined | Timestamp>
    );

    if (Object.keys(filteredData).length === 0) {
      return { success: false, error: "No valid data to update" };
    }

    await adminDb
      .collection("exko")
      .doc("users")
      .collection("users")
      .doc(userId)
      .update(filteredData);

    return { success: true, updated: Object.keys(filteredData) };
  } catch (err: unknown) {
    return ReturnMessage(false, "Update failed") 
  }
};

const updateChat = async (read: boolean, userId: string) => {
  const { adminDb } = await getAdminServices();

  const updateType = read
    ? {
        from_nt: 0,
      }
    : {
        to_nt: FieldValue.increment(1),
        date: FieldValue.serverTimestamp(),
      };

  await adminDb
    .collection("exko")
    .doc("support")
    .collection("users")
    .doc(userId)
    .update({
      ...updateType,
    });
};

const fileUploader = async (userId: string, fileObject: File, ) => {
  const { adminDb, adminStorage } = await getAdminServices();

  const buffer = Buffer.from(await fileObject.arrayBuffer());

  const fileName = uuid();
  const filePath = `support/users/${userId}/${fileName}`;
  const bucket = adminStorage.bucket(process.env.FIREBASE_STORAGE_BUCKET);
  const file = bucket.file(filePath);

  const uploadMetadata = {
    contentType: fileObject.type,
    metadata: {
      uploadedAt: FieldValue.serverTimestamp(),
      originalFileName: fileObject.name,
      userId: userId,
      fileSize: fileObject.size,
    },
  };

  try {
    await file.save(buffer, {
      metadata: uploadMetadata,
      resumable: false,
      public: true,
    });

    const publicURL = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${filePath}`;

    await adminDb
      .collection("exko")
      .doc("support")
      .collection("users")
      .doc(userId)
      .collection("chat")
      .add({ userImage: publicURL, date: FieldValue.serverTimestamp() });

    await updateChat(false, userId);

    return ReturnMessage(true, "Success");
  } catch (err) {
    return ReturnMessage(false, "Something went wrong. Please try again later!")
  }
};

export const sendSupportMessage = async (userId: string, message: string | File, messageType?: boolean): Promise<ReturnedMessage> => {
  try {
    const { adminDb } = await getAdminServices();

    if (messageType) {
      return await fileUploader(userId, message as File);
    } else {
      await adminDb
        .collection("exko")
        .doc("support")
        .collection("users")
        .doc(userId)
        .collection("chat")
        .add({ userMessage: message, date: FieldValue.serverTimestamp() });

      await updateChat(false, userId);
    }

    return ReturnMessage(true, "Success");
  } catch (err) {
    return ReturnMessage(false, "Something went wrong. Please try again later!")
  }
};

export const setUserSupportChat = async (userId: string, message: string | File, messageType?: boolean): Promise<ReturnedMessage> => {
  try {
    const { adminDb } = await getAdminServices();

    const chatExists = await adminDb
      .collection("exko")
      .doc("support")
      .collection("users")
      .doc(userId)
      .get();

    if (chatExists?.exists === true) return ReturnMessage(false, "Chat already exists");

    const userData = await getUserData(userId);

    await adminDb
      .collection("exko")
      .doc("support")
      .collection("users")
      .doc(userId)
      .set({
        userId: userId,
        name: userData?.name || userData?.email,
        number: userData?.email || userData?.number,
      });

    if (messageType) {
      return await fileUploader(userId, message as File);
    } else {
      return await sendSupportMessage(userId, message);
    }
  } catch (err) {
    return ReturnMessage(false, "Something went wrong. Please try again later!")
  }
};
