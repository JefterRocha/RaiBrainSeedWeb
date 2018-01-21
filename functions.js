const ASCIICHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';

const AsciiParser = (string) =>
	{
		for(let c of string)
			{
				if(!ASCIICHARS.match(c))
					{
						return false;
					}
			}
		return true;
	}

const AsciiList = (string) =>
	{
		s = string.replace(/\s/g, "");
		l = Array.from(new Set(s));
		l.sort();
		return l;
	}

const MakeHexDic = (l) =>
	{
		d = {};
		for(let i in l)
			{
				d[l[i]] = (i%16).toString(16).toUpperCase();
			}
		return d;
	}

const MakeSeed = (s, d) =>
	{
		s = s.replace(/\s/g, "");
		l = Array.from(s);
		seed = [];
		for(let c in l)
			{
				seed.push(d[l[c]]);
			}

		seed = seed.join("");
		while(seed.length < 64)
			{
				seed += seed;
			}
		return seed.slice(0,64);
	}

const MainFlow = (s) =>
	{
		if (!AsciiParser(s))
			{
				return false;
			}
		l = AsciiList(s);
		d = MakeHexDic(l);
		seed = MakeSeed(s, d);
		return seed;
	}

/*-------------------------------------------------------------------*/
document.querySelector(".btn").onclick = () =>
    {
        phrase = document.querySelector(".phrase");
        warning = document.querySelector(".warning");
        seedField = document.querySelector(".seed-field > span");

        if(phrase.value == 0)
            {
				warning.classList.remove("alert-info");
				warning.classList.remove("alert-success");
				warning.classList.add("alert-danger");
				warning.textContent = "Insert a phrase first!";
                seedField.textContent = "";
            }

        else if(MainFlow(phrase.value) !== false)
            {
				warning.classList.remove("alert-info");
				warning.classList.remove("alert-danger");
				warning.classList.add("alert-success");
				warning.textContent = "Your seed!";
				seedField.style.color = "#3c763d";
                seedField.textContent = MainFlow(phrase.value);
            }
        else
            {
				warning.classList.remove("alert-info");
				warning.classList.remove("alert-success");
				warning.classList.add("alert-danger");
				warning.textContent = "Your phrase has an invalid character!";
                seedField.textContent = "";
            }
    }