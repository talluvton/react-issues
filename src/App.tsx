import {useState, useEffect} from 'react'
import './App.css'
import Issue from './components/Issue'
import Loader from './components/Loader'


function App() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [error, setError] = useState<any>(null)
  const [expandedIssues, setExpandedIssues] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1); 
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const perPage = 30; 

  const toggle = (index: number) => {
    const key = `${page}-${index}`;
    setExpandedIssues(prev => {
      const newExpanded = new Set(prev);
      newExpanded.has(key) ? newExpanded.delete(key) : newExpanded.add(key); 
      return newExpanded;
    });
  };

  interface Issue {
    title: string;
    id: number;
    number: number;
    body: string;
  }

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      const token = process.env.REACT_APP_GITHUB_TOKEN;
      console.log(token)
      if (!token) {
        setError(new Error("GitHub token is not defined."));
        setLoading(false);
        return;
      }
      try {
        const response = await fetchIssuesFromAPI(token);
        const newIssues = await handleResponse(response);
        setIssues(newIssues);
        checkNextPageLink(response.headers.get('Link'));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchIssuesFromAPI = async (token: string) => {
      const response = await fetch(
        `https://api.github.com/repos/facebook/react/issues?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    };

    const handleResponse = async (response: Response) => {
      return await response.json();
    };

    const checkNextPageLink = (linkHeader: string | null) => {
      if (linkHeader) {
        const nextLink = linkHeader.split(', ').find(link => link.includes('rel="next"'));
        setHasNextPage(!!nextLink);
      } else {
        setHasNextPage(false);
      }
    };

    fetchIssues();
  }, [page]);

  const handleNext = () => {
    if (hasNextPage) setPage(page + 1); 
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Issues</h1>
      </header>
      {error ? (
        <p>Error fetching issues: {error.message}</p>
      ) : issues.length > 0 ? (
        <>
          <p style={{ margin: '10px 0', marginLeft: '10px'}}>Issues on page {page}:</p>
          {issues.map((issue: Issue, index: number) => {
            const key = `${page}-${index}`;
            return (
              <Issue 
                key={issue.id} 
                issue={issue} 
                index={index} 
                selected={expandedIssues.has(key)} 
                toggle={toggle}
              />
            );
          })}  
          <div className="button-container">
            <button className="button" onClick={handlePrevious} disabled={page === 1}>
              Previous
            </button>
            <button className="button" onClick={handleNext} disabled={!hasNextPage || loading}>
              {loading ? 'Loading...' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
