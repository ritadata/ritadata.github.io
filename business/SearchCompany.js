function SearchCompanyInput({ onSelectedCompany, ...props }) {
  const Select = window.antd.Select;
  const Spin = window.antd.Spin;
  const Empty = window.antd.Empty;

  const [isFetching, setIsFetching] = React.useState(false);

  const [companies, setCompanies] = React.useState(null);
  const [typedText, setTypedText] = React.useState("");
  const [selectedCompany, setSelectedCompany] = React.useState(null);

  const fetchSuggestions = _.debounce(async (domain) => {
    setIsFetching(true);
    try {
      const res = await fetch(
        `https://api.ritadata.com/search-company?event=visits&company=${domain}`
      );

      const resJson = await res.json();

      const allCompanies = resJson["result"].map((company) => {
        return { label: company, value: company };
      });

      console.log("response", allCompanies);
      setCompanies(allCompanies);
    } catch (err) {
      console.log(err.message);
    }
    setIsFetching(false);
  }, 300); // 300ms debounce

  function extractMainDomain(input) {
    try {
      // If the input doesn't start with http or https, prepend it with http:// to ensure it's a valid URL.
      if (!input.startsWith("http://") && !input.startsWith("https://")) {
        input = "http://" + input;
      }

      // Use the URL constructor to parse the input.
      const url = new URL(input);

      // Extract the hostname (e.g., www.google.com) from the URL.
      const hostname = url.hostname;

      // Use a regex to remove "www." prefix if it exists.
      const domain = hostname.replace(/^www\./, "");

      // Split the domain using "." and get the main domain part.
      const domainParts = domain.split(".");
      return domainParts.length > 1
        ? domainParts[domainParts.length - 2]
        : domain;
    } catch (error) {
      // If there's an error in parsing, return the original input.
      return input;
    }
  }

  React.useEffect(() => {
    if (typedText.length) {
      const domain = extractMainDomain(typedText);
      fetchSuggestions(domain);
    } else {
      setCompanies(null);
    }

    return () => fetchSuggestions.cancel();
  }, [typedText]);

  return (
    <Select
      {...props}
      suffixIcon={null}
      className={props.className ? props.className : "w-full"}
      placeholder={props.placeholder ? props.placeholder : "Search website"}
      placement={"bottomLeft"}
      showSearch
      popupMatchSelectWidth={false}
      filterOption={false}
      loading={isFetching}
      value={selectedCompany}
      options={companies}
      onSearch={(value) => {
        console.log("search", value);
        setTypedText(value);
      }}
      onSelect={(newVal) => {
        onSelectedCompany(newVal);
        setSelectedCompany(newVal);

        setSelectedCompany(null);
        setCompanies(null);
      }}
      notFoundContent={
        isFetching ? (
          <Spin size="small" />
        ) : (
          <Empty
            image={
              !companies
                ? Empty.PRESENTED_IMAGE_DEFAULT
                : Empty.PRESENTED_IMAGE_SIMPLE
            }
            description={
              !companies
                ? "Start typing and we'll suggest matches..."
                : "Oops! No match. Try another name."
            }
          />
        )
      }
    />
  );
}
