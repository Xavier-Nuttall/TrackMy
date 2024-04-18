test("fetching /", async () => {
    let resp = await fetch("http://localhost:3001", {redirect: "manual"});
    expect(resp.status).toBe(302)
})