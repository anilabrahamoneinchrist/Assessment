import ApiList, {Api} from "./components/ApiList";
const apis: Api[] = [
  { id: '1', name: 'User API', url: 'https://api.example.com/user', status: 'Production' },
  { id: '2', name: 'Order API', url: 'https://api.example.com/order', status: 'Development' },
  { id: '3', name: 'Legacy API', url: 'https://api.example.com/legacy', status: 'Deprecated' },
];
function App() {
  return (
    <div>
      <div className="p-8 text-center text-xl text-primary">
        {/* Hello Candidate */}
        <ApiList apis={apis} />
      </div>
    </div>
 
  );
}
export default App;
