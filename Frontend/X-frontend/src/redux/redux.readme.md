# Basic Steps of Redux to Get Information

1. **Create a Store**  
   - Set up a Redux store in your project.

2. **Create a User Slice**  
   - Use Redux Toolkit to create a `userSlice`.  
   - Add actions like `getUser` and `getProfile` in the slice.

3. **Provide the Store in `main.jsx`**  
   - Use the `Provider` component from `react-redux` to pass the store to your app.

4. **Set the User When Logged In**  
   - Use the `useDispatch` hook to update the user state when a user logs in.

5. **Create Custom Hooks**  
   - Write custom hooks like `useGetProfile` to fetch and manage user data.

6. **Fetch User Profile with `axios.get`**  
   - Use `axios` to send a GET request to retrieve the user profile data.

7. **Send Profile Data to `userSlice`**  
   - Dispatch an action (e.g., `getProfile`) to save the profile data in the Redux store.

8. **Call Custom Hooks in Profile Component**  
   - Use the custom hooks (e.g., `useGetProfile`) inside your `Profile` component.

9. **Profile Data Available Through Redux**  
   - When the profile page renders, the profile information will be available in Redux.

10. **Access Profile Data with `useSelector`**  
    - Use the `useSelector` hook to get the profile data from the Redux store.